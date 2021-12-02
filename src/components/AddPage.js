import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
  TextField,
  Menu,
  MenuItem,
} from "@material-ui/core";
import "./AddPage.css";
import { IoAddCircleOutline } from "react-icons/io5";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddPage = ({
  open,
  handleClose,
  addPage,
  pages,
  setFields,
  handleDelete,
  addContent,
  setContentFields,
  addList,
  setListFields,
}) => {
  const data = pages;
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = (p_id, type) => {
    addContent(p_id, type);
    setAnchorEl(null);
  };

  const getNameByType = (value) => {
    if (value === "Text") {
      return {
        name: "textName",
        value: "textValue",
      };
    }
    if (value === "Number") {
      return {
        name: "numberName",
        value: "numberValue",
      };
    }
    if (value === "List") {
      return {
        name: "listName",
        value: "listValue",
      };
    }
  };
  return (
    <>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">{"Add Page"}</DialogTitle>
        <DialogContent>
          {data.map((page) => (
            <div>
              <span
                style={{
                  fontSize: 14,
                  color: "rgba(0, 0, 0, 0.7)",
                }}
              >
                Page {`${data.indexOf(page) + 1}`}
              </span>
              <div className="page-container" key={page.id}>
                <TextField
                  variant="outlined"
                  label="Page Name"
                  fullWidth
                  name="pageName"
                  style={{ margin: "10px 0" }}
                  onChange={(event) =>
                    setFields(page.id, "pageName", event.target.value)
                  }
                  value={page.pageName}
                />
                <TextField
                  variant="outlined"
                  label="Page Description"
                  fullWidth
                  name="pageDescription"
                  style={{ margin: "10px 0" }}
                  onChange={(event) =>
                    setFields(page.id, "pageDescription", event.target.value)
                  }
                  value={page.pageDescription}
                />
                <div
                  className="bin-container"
                  onClick={() => handleDelete(page.id, 0)}
                >
                  X
                </div>
                <span
                  style={{
                    fontSize: 14,
                    color: "rgba(0, 0, 0, 0.5",
                  }}
                >
                  Page Content{" "}
                </span>
                <div className="content-container">
                  {page.content.map((content) => (
                    <div>
                      <span
                        style={{
                          fontSize: 14,
                          color: "rgba(0, 0, 0, 0.5",
                        }}
                      >
                        {content.type}{" "}
                      </span>
                      <div className="inputs-container" key={content.id}>
                        <TextField
                          variant="outlined"
                          label="Name"
                          fullWidth
                          name={getNameByType(content.type).name}
                          style={{ margin: "10px 0" }}
                          onChange={(event) =>
                            setContentFields(
                              page.id,
                              content.id,
                              event.target.name,
                              event.target.value
                            )
                          }
                          value={content.textName}
                        />
                        {(content.type === "Text" ||
                          content.type === "Number") && (
                          <TextField
                            variant="outlined"
                            label="Value"
                            fullWidth
                            name={getNameByType(content.type).value}
                            type={content.type === "Text" ? "text" : "number"}
                            style={{ margin: "10px 0" }}
                            onChange={(event) =>
                              setContentFields(
                                page.id,
                                content.id,
                                event.target.name,
                                event.target.value
                              )
                            }
                            value={content.textValue}
                          />
                        )}
                        {content.type === "List" && (
                          <>
                            {content.listValue.map((list) => (
                              <TextField
                                variant="outlined"
                                label={`Value #${
                                  content.listValue.indexOf(list) + 1
                                }`}
                                fullWidth
                                name={getNameByType(content.type).value}
                                style={{ margin: "10px 0" }}
                                onChange={(event) =>
                                  setListFields(
                                    page.id,
                                    content.id,
                                    list.id,
                                    event.target.value
                                  )
                                }
                                // value={
                                //   content.listValue[
                                //     content.listValue.indexOf(list)
                                //   ].value
                                // }
                              />
                            ))}
                            <div
                              className="add-btn-container"
                              onClick={() => addList(page.id, content.id)}
                            >
                              <IoAddCircleOutline /> <span>Add items</span>
                            </div>
                          </>
                        )}
                        <div
                          className="bin-container"
                          onClick={() => handleDelete(page.id, 1, content.id)}
                        >
                          X
                        </div>
                      </div>
                    </div>
                  ))}
                  <div className="inner-btn-container">
                    <Button
                      aria-controls="simple-menu"
                      aria-haspopup="true"
                      variant="outlined"
                      color="primary"
                      onClick={handleClick}
                      // onClick={addPage}
                    >
                      Add Content
                    </Button>
                    <Menu
                      id="simple-menu"
                      anchorEl={anchorEl}
                      keepMounted
                      open={Boolean(anchorEl)}
                      // onClose={handleMenuClose}
                    >
                      <MenuItem onClick={() => handleMenuClose(page.id, 0)}>
                        Text
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuClose(page.id, 1)}>
                        Number
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuClose(page.id, 2)}>
                        List
                      </MenuItem>
                      <MenuItem onClick={() => handleMenuClose(page.id, 3)}>
                        Images
                      </MenuItem>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <Button variant="outlined" color="primary" onClick={addPage}>
            Add Page
          </Button>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary" variant="contained">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddPage;
