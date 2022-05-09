import styled from "styled-components";

export default function Button(props) {
  const { type, callback, obj } = props;
  return (
    <Container
      type={type}
      onClick={
        obj
          ? (e) => {
              callback(e, obj.value, obj.description);
            }
          : callback
      }
    >
      {props.children}
    </Container>
  );
}

const Container = styled.button`
  height: 60px;
  width: 100%;
  border: none;
  border-radius: 5px;
  font-size: 20px;
  font-weight: 700;
  color: var(--white);
  background-color: var(--purple);
`;
