import React from "react";
import Form from "../components/Form";

import { create, act } from "react-test-renderer";

let component;

const props = {
  handleSubmit: jest.fn(),
  history: {},
};

describe("<Form />", () => {
  beforeEach(() => {
    component = create(<Form {...props} />);
  });

  it("Renderiza correctamente", () => {
    expect(component).toBeDefined();
    expect(component.toJSON().type).toEqual("form");
    expect(component.root.findByType("input")).toBeDefined();
    expect(component.root.findByType("button")).toBeDefined();
    expect(component.root.findByType("svg")).toBeDefined();
    // console.log(component.root);
  });

  it("El boton se habilita si el contenido del input es diferente de vacio", () => {
    const form = component.root.findByType("form");
    const input = form.findByType("input");
    const button = form.findByType("button");
    expect(button.props.disabled).toBeTruthy();
    expect(button.props.className).toEqual("search-button null");

    act(() => {
      // cuando queremos hacer un cambio de estado usamos act
      // un cambio interno en el componente
      input.props.onChange({ target: { value: "aves" } });
    });

    expect(button.props.disabled).toBeFalsy();
    expect(button.props.className).toEqual("search-button active");
  });

  it("se debe de llamar al OnSubmit sin problemas", () => {
    const form = component.root.findByType("form");

    form.props.onSubmit();
    // dado que onSubmit esta dentro de las props del componente (objeto, instancia) en este archivo

    // se ejecuto onSubmit lo que significa que nuetro mockin de la funcion
    // ya fue ejecutado
    // solo validamos
    expect(props.handleSubmit).toHaveBeenCalled();

    expect(props.handleSubmit).toHaveBeenCalledTimes(1);

    // con este matche verificamos cuantas veces aha sido llamada una funcion

    expect(props.handleSubmit).toHaveBeenCalledWith(
      undefined,
      props.history,
      ""
    );
    // Para verificar con que argumetos ha sido llamada dicha funcion
  });
});
