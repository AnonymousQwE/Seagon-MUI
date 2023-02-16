import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { loginUser, registerUser } from "../../hooks/userHook";

export default function AuthForm({ dispatch }) {
  const [action, setAction] = useState("login");
  const [showPassword, setShowPassword] = useState(false);
  const { status } = useSelector((state) => state.user);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    action === "login"
      ? dispatch(loginUser(data))
      : dispatch(registerUser(data));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid lg={3} sm={5} item>
      <Box
        // display={"flex"}
        position={"relative"}
        flexDirection={"column"}
        alignItems={"center"}
        boxShadow={4}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        {status === "loadUser" ? (
          <Box
            sx={{
              position: "absolute",
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "gray",
              opacity: 0.4,
              zIndex: (theme) => theme.zIndex.drawer + 1,
            }}
          >
            <CircularProgress size={80} color="primary" />
          </Box>
        ) : (
          ""
        )}
        <Box
          display={"flex"}
          flexDirection={"column"}
          alignItems={"center"}
          gap={1}
          px={5}
          py={1}
        >
          <Typography sx={{ fontWeight: "bold", fontSize: 25 }}>
            {action === "login" ? "Авторизация" : "Регистрация"}
          </Typography>
          <FormControl
            error={!!errors?.email}
            sx={{ minWidth: "100%", m: 1 }}
            variant="outlined"
          >
            <InputLabel htmlFor="email">Email</InputLabel>
            <OutlinedInput
              id="email"
              aria-describedby="email-error"
              label="Email"
              {...register("email", {
                required: "Введите email!",
              })}
            />
            <FormHelperText id="email-error">
              {errors?.email?.message}
            </FormHelperText>
          </FormControl>

          <FormControl
            error={!!errors?.password}
            sx={{ minWidth: "100%", m: 1 }}
            variant="outlined"
          >
            <InputLabel htmlFor="password">Пароль</InputLabel>

            <OutlinedInput
              id="password"
              type={showPassword ? "text" : "password"}
              label="Пароль"
              {...register("password", {
                required: "Введите пароль!",
                minLength: { value: 6, message: "Не менее 6 символов!" },
              })}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText id="email-error">
              {errors?.password?.message}
            </FormHelperText>
          </FormControl>
          <Button
            disabled={
              !!errors.email || !!errors.password || status === "loading"
            }
            type="submit"
            variant="contained"
          >
            {action === "login" ? "Войти" : "Зарегистрироваться"}
          </Button>
          <Typography sx={{ fontSize: 12 }}>
            {action === "login" ? "Еще нет аккаунта?" : "Уже есть аккаунт?"}
          </Typography>
          <Link
            onClick={(e) => {
              e.preventDefault();
              setAction(action === "login" ? "register" : "login");
            }}
            href=""
            sx={{ fontSize: 12 }}
          >
            {action === "login" ? "Зарегистрироваться" : "Войти"}
          </Link>
        </Box>
      </Box>
    </Grid>
  );
}
