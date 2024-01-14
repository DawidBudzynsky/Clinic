import DoctorInfoModal from "./DoctorInfoModal";
import { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import api from "../api";
import { SPECIALITIES_URL } from "../apiurls";

export default function SearchBar({ setSearch, haveSelect = false, selectValues = [], setSelectSearch = () => { } }) {

  const preventSubmiting = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {haveSelect ? (
        <Form className="w-50 pe-5" onSubmit={preventSubmiting}>
          <Form.Select onChange={setSelectSearch} >
            <option value="">All</option>
            {selectValues.map((option, index) => (
              <option key={index} value={option}>{option}</option>
            ))}
          </Form.Select>
        </Form>
      ) : null}
      <Form className="w-100 ps-5" onSubmit={preventSubmiting}>
        <Form.Control placeholder="Search term" onChange={setSearch} />
      </Form>
    </>
  )
}
