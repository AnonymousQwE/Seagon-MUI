import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { loginUser } from "../../hooks/userHook";

export default function LoginForm({ dispatch, navigate, from }) {
  const [showPassword, setShowPassword] = useState(false);
  const { user } = useSelector((state) => state.user);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  return (
    <Grid lg={3} sm={5} item>
      <Box
        display={"flex"}
        flexDirection={"column"}
        gap={1}
        p={5}
        boxShadow={4}
        component={"form"}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl error={!!errors?.email} sx={{ m: 1 }} variant="outlined">
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
          sx={{ m: 1 }}
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
          disabled={!!errors.email || !!errors.password}
          type="submit"
          variant="contained"
        >
          Войти
        </Button>
      </Box>
    </Grid>
  );
}
