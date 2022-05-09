import styled from "styled-components";

export default function Input(props) {
  const { value, setValue, placeholder, type } = props;
  return (
    <Container
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
}

const Container = styled.input`
  height: 60px;
  width: 100%;
  padding: 0 15px;
  margin-bottom: 15px;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 400;
  color: var(--black);
`;
