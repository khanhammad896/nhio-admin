import React from "react";
import "./Page.css";
import { Box, Button } from "@material-ui/core";
import AddPage from "./components/AddPage";
import Certificate from "./components/Certificate";
const Page = () => {
  const [open, setOpen] = React.useState(false);
  const [certOpen, setCertOpen] = React.useState(false);
  const [pages, setPages] = React.useState({
    pages: [],
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCertOpen = () => {
    setCertOpen(true);
  };

  const handleCertClose = () => {
    setCertOpen(false);
  };

  const addPage = () => {
    const newPage = JSON.parse(JSON.stringify(pages));
    newPage.pages.push({
      id: newPage.pages.length,
      pageName: "",
      pageDescription: "",
      content: [],
    });
    setPages(newPage);
  };

  const setFields = (p_id, name, value) => {
    const newPage = JSON.parse(JSON.stringify(pages));
    const page = newPage.pages.find((p) => p.id === p_id);
    page[name] = value;
    setPages(newPage);
  };

  const setContentFields = (p_id, c_id, name, value) => {
    const newPage = JSON.parse(JSON.stringify(pages));
    const newContent = newPage.pages
      .find((p) => p_id === p.id)
      .content.find((c) => c_id === c.id);
    newContent[name] = value;
    setPages(newPage);
  };

  const setListFields = (p_id, c_id, l_id, value) => {
    const newPage = JSON.parse(JSON.stringify(pages));
    const newListItem = newPage.pages
      .find((p) => p_id === p.id)
      .content.find((c) => c.id === c_id)
      .listValue.find((l) => l.id === l_id);
    newListItem["value"] = value;
    setPages(newPage);
  };

  const handleDelete = (p_id, type, c_id = null) => {
    const newPage = JSON.parse(JSON.stringify(pages));
    const newContent = newPage.pages.find((p) => p_id === p.id).content;
    if (type === 0) {
      newPage.pages.splice(
        newPage.pages.findIndex((p) => p.id === p_id),
        1
      );
    }
    if (type === 1) {
      newContent.splice(
        newContent.findIndex((c) => c.id === c_id),
        1
      );
    }
    setPages(newPage);
  };

  const addContent = (p_id, type) => {
    const newPage = JSON.parse(JSON.stringify(pages));
    const newContent = newPage.pages.find((p) => p.id === p_id).content;
    if (type === 0) {
      newContent.push({
        id: newContent.length,
        textName: "",
        textValue: "",
        type: "Text",
      });
    }
    if (type === 1) {
      newContent.push({
        id: newContent.length,
        numberName: "",
        numberValue: "",
        type: "Number",
      });
    }
    if (type === 2) {
      newContent.push({
        id: newContent.length,
        listName: "",
        listValue: [],
        type: "List",
      });
    }
    setPages(newPage);
  };

  const addList = (p_id, c_id) => {
    const newPage = JSON.parse(JSON.stringify(pages));
    const newList = newPage.pages
      .find((p) => p.id === p_id)
      .content.find((c) => c_id === c.id).listValue;
    newList.push({
      id: newList.length,
      value: "",
    });
    setPages(newPage);
  };

  console.log("Pages >>> ", pages);
  return (
    <>
      <Box>
        <div className="btn-container">
          <Button variant="contained" color="primary" onClick={handleClickOpen}>
            Add Page
          </Button>
        </div>
        <div className="btn-container">
          <Button variant="contained" color="primary" onClick={handleCertOpen}>
            Download
          </Button>
        </div>
        <Certificate open={certOpen} handleClose={handleCertClose} />
        <AddPage
          open={open}
          handleClose={handleClose}
          addPage={addPage}
          pages={pages.pages}
          setFields={setFields}
          handleDelete={handleDelete}
          addContent={addContent}
          setContentFields={setContentFields}
          addList={addList}
          setListFields={setListFields}
        />
      </Box>
    </>
  );
};

export default Page;
