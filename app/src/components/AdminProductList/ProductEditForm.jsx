import { CheckCircleOutline, PhotoCamera } from "@mui/icons-material";
import s from "./ProductEditForm.module.scss";
import {
  Avatar,
  Box,
  Button,
  CircularProgress,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { storage } from "../../firebase";

export default function ProductEditForm({ setOpen, item }) {
  const { category } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(null);
  const [image, setImage] = useState(item.image);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: {
      title: item.title,
      id: item.id,
      cat: String(item.categoryId),
      description: item.description,
    },
    mode: "onChange",
  });

  const onSubmit = (data) => {
    const currentProd = { ...data, image };
    console.log(currentProd);
    setOpen(false);
    // dispatch(setProducts({ product: currentProduct }));
  };
  return (
    <Box component={"form"} onSubmit={handleSubmit(onSubmit)} width={"100%"}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
        }}
      >
        <Box
          className={s.avatar}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            alignItems: "center",
            height: 150,
            width: 150,
            gap: 1,
          }}
        >
          <Avatar
            sx={{ position: "absolute", width: 150, height: 150 }}
            src={image}
          ></Avatar>

          {progress === 100 ? (
            <Box className={s.imagebox}>
              <IconButton
                sx={{
                  zIndex: 10,
                }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <CheckCircleOutline sx={{ width: 40, height: 40 }} />
              </IconButton>
            </Box>
          ) : progress ? (
            <Box
              sx={{
                zIndex: 10,
                position: "absolute",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                background: "black",
                opacity: 0.5,
                borderRadius: "50%",
                width: "100%",
                height: "100%",
              }}
            >
              <CircularProgress
                sx={{
                  zIndex: 10,
                  position: "absolute",
                  width: 40,
                  height: 40,
                }}
                variant="determinate"
                value={progress}
              />
            </Box>
          ) : (
            <Box className={s.imagebox}>
              <IconButton
                sx={{
                  zIndex: 10,
                }}
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input
                  hidden
                  accept="image/*"
                  type="file"
                  onChange={(e) => {
                    const imageUpload = e.target.files[0];
                    if (imageUpload == null) return;
                    const imageRef = ref(
                      storage,
                      `images/products/${
                        item.title.toLowerCase() +
                        "-" +
                        new Date().toISOString()
                      }`
                    );
                    const UploadImage = uploadBytesResumable(
                      imageRef,
                      imageUpload
                    );

                    UploadImage.on(
                      "state_changed",
                      (snapshot) => {
                        const prog = Math.round(
                          (snapshot.bytesTransferred / snapshot.totalBytes) *
                            100
                        );
                        setProgress(prog);
                        console.log(prog);
                      },
                      () => {},
                      (props) => {
                        getDownloadURL(UploadImage.snapshot.ref).then(
                          (downloadURL) => {
                            setImage(downloadURL);
                            console.log("File available at", downloadURL);
                          }
                        );
                      }
                    );
                  }}
                />
                <PhotoCamera sx={{ width: 40, height: 40 }} />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box>
          <Box
            display={"flex"}
            flexDirection={"column"}
            maxHeight={"200px"}
            flexWrap={"wrap"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={2}
            width={"100%"}
            py={2}
          >
            <TextField
              id="id"
              label="ID"
              variant="standard"
              disabled={true}
              {...register("id")}
            />
            <TextField
              id="title"
              label="Название"
              variant="standard"
              {...register("title", {
                required: "Введите название!",
              })}
            />
            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel id="category">Категория</InputLabel>
              <Select
                sx={{ width: 250 }}
                labelId="category"
                defaultValue={item.categoryId}
                {...register("cat", {
                  required: "Выберите категорию!",
                })}
              >
                {category.map((cat) => (
                  <MenuItem key={cat.id} value={cat.id}>
                    {cat.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              sx={{ width: 250 }}
              id="standard-multiline-flexible"
              label="Описание"
              multiline
              maxRows={4}
              variant="standard"
              {...register("description", {
                required: "Введите описание!",
              })}
            />
          </Box>
          <Box>
            <Button type="submit" variant="contained">
              Изменить
            </Button>
            <Button
              onClick={() => {
                dispatch(getStorage({ id: "EbeR0gIsseVqAgR2Gud8" }));
              }}
            >
              {" "}
              Проверить
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
