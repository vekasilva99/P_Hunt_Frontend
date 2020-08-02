import React from "react";
import styled from "styled-components";
export default function Input({
  label,
  name,
  id,
  type,
  value,
  onChange,
  onBlur,
  color,
  min,
  max,
}) {
  return (
    <StyleInput color={color}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        name={name}
        required
        autoComplete="off"
        onBlur={onBlur}
        id={id}
        value={value}
        min={min}
        max={max}
        onChange={onChange}
      />
    </StyleInput>
  );
}
const StyleInput = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 600px;

  align-items: center;
  justify-content: center;
  label {
    font-size: 1em;
    font-weight: 200;
    color: #fafafa;
    margin: 0.2rem;
    cursor: pointer;
    margin-top: 0.5rem;
  }
  input {
    background: none;
    font-size: 1em;
    box-shadow: 0 0 2px rgba(0, 0, 0, 0.5);
    color: #fafafa;
    border: none;
    border-bottom: solid 2px #ebebeb;
    box-shadow: none;
    outline: none;
    transition: all ease-in-out 0.5s;
    opacity: 0.8;
    margin-top: 1rem;
    padding: 0.3rem 0.5rem;
    margin-left: 0;
    width: 25vw;

    &:focus {
      opacity: 1;
      outline: none;
      box-shadow: none;
      border-bottom: solid 2px ${(props) => props.color} !important;
    }
  }

  @media only screen and (max-width: 734px) {
    input {
      width: 80vw;
    }
  }
`;
