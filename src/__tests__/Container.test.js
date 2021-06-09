import React from "react";
import { act, create } from "react-test-renderer";
import PhotoContextProvider from "../context/PhotoContext";

import axios from "axios";
// importa axios del mocking de la dependencia

import Container from "../components/Container";
import Gallery from "../components/Gallery";

let component;

describe("<Container />", () => {
  beforeEach(async () => {
    await act(async () => {
      component = await create(
        // la primera vez que se monta el componente se llama a axios.get
        <PhotoContextProvider>
          <Container searchTerm="" />
        </PhotoContextProvider>
      );
    });
  });

  it("El componente renderiza correctamente", () => {
    expect(component.root).toBeDefined();
    expect(component.root.findByType(Container)).toBeDefined();

    expect(component.root.findByType(Gallery)).toBeDefined();
  });

  it("Llama a la API si es necesario o si cambia el texto", async () => {
    const customData = {
      data: {
        photos: {
          photo: [
            {
              farm: "farm1",
              server: "serverTest",
              id: 1,
              secret: "secret00",
              title: "hey",
              url: "uri1",
            },
          ],
        },
      },
    };

    axios.get.mockImplementation(() =>
      // esta mock Implementation se hizo para corroborar si
      // en realidad esta data esta llegando
      Promise.resolve(customData)
    );

    await act(async () => {
      await component.update(
        <PhotoContextProvider>
          <Container searchTerm="text" />
        </PhotoContextProvider>
      );
    });

    expect(axios.get).toHaveBeenCalled();
    expect(axios.get).toHaveBeenCalledTimes(3);
    expect(axios.post).not.toHaveBeenCalled();
    expect(axios.put).not.toHaveBeenCalled();

    //se puede hacer mocking de cualquier dependencia practicamente
    // haciendo lo mismo que en este archivo y corrovorar si ha sido
    // llamada o no?

    expect(component.root.findByType(Gallery).props.data).toEqual(
      customData.data.photos.photo
    );
  });
});
