import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useUser } from "../../hooks/useUser";

const Input = styled.input`
  display: block;
  font-size: 2em;
  font-weight: light;
  padding: 0.25em;
  border: none;
  border-bottom: 1px solid #0002;
`;
const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
`;
const ErrorMessage = styled.div`
  font-size: 0.8em;
  font-weight: light;
  height: 1.5em;
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  row-gap: 0.5em;
`;
const Button = styled.input`
  padding: 1em 2em;
  border: none;
  text-transform: uppercase;
`;

export function JoinRoom() {
  const navigate = useNavigate();
  const { username, setUsername, shortcode, setShortcode } = useUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: username ?? "",
      shortcode: shortcode ?? "",
    },
  });

  const onSubmit = (data: { username: string; shortcode: string }) => {
    if (Object.entries(errors).length !== 0) {
      return;
    }
    setUsername(data.username);
    setShortcode(data.shortcode);
    navigate(`/rooms/${data.shortcode}`);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup>
        <Input
          type="text"
          placeholder="Your Name"
          {...register("username", {
            required: {
              value: true,
              message: "Please provide your name",
            },
            maxLength: {
              value: 24,
              message: "Please limit your name to 24 characters",
            },
          })}
        />
        <ErrorMessage>{errors.username?.message}</ErrorMessage>
      </InputGroup>
      <InputGroup>
        <Input
          type="text"
          placeholder="Room Code"
          {...register("shortcode", {
            required: true,
            pattern: {
              value: /[A-Za-z0-9]{6}/i,
              message: "Please provide a valid, 6 character room code",
            },
          })}
        />
        <ErrorMessage>{errors.shortcode?.message}</ErrorMessage>
      </InputGroup>
      <div>
        <Button type="submit" value="Submit" />
      </div>
    </Form>
  );
}
