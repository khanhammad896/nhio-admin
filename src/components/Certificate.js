import React, { useCallback, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Slide,
  Button,
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import logo from "./NHIOR.ccad92ea.jpg";
import headLogo from "./new-logo.ac84e68c.png";
import * as htmlToImage from "html-to-image";
import { toJpeg } from "html-to-image";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
const useStyles = makeStyles({
  title: {
    textAlign: "center",
    fontWeight: "600",
    padding: "15px 24px",
  },
  newCer: {
    display: "block",
    fontWeight: 700,
    fontFamily: "Arial,Helvetica,Arial,Lucida,sans-serif",
    fontSize: 22,
    color: "#333",
    lineHeight: "1em",
  },
  content: {
    padding: 0,
    paddingBottom: 20,
    display: "flex",
    justifyContent: "center",
  },
  certificate: {
    boxSizing: "border-box",
    width: 510,
    height: 349,
    border: "4px double #0d4a2b",
    padding: 20,
    textAlign: "center",
    background: `url(${logo})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "-60px 100px",
    float: "left",
    backgroundColor: "#fff",
  },
  newHoleInOne: {
    fontWeight: 900,
    fontSize: 31,
    fontFamily: "times-new-roman",
    color: "#0d492b",
    paddingBottom: 10,
  },
  nameCert: {
    width: "100%",
    float: "left",
    fontSize: 29,
    color: "#000",
    fontFamily: "times-new-roman",
    fontWeight: 600,
  },
  nameCourse: {
    width: "100%",
    float: "left",
    fontSize: "19px",
    fontFamily: "times-new-roman",
    margin: 0,
    color: "#000",
  },
  newDate: {
    width: "100%",
    float: "left",
    fontSize: "19px",
    fontFamily: "times-new-roman",
    marginBottom: 10,
    color: "#000",
  },
  extraInfo: {
    width: "100%",
    float: "left",
    fontSize: 17,
    fontFamily: "times-new-roman",
    marginBottom: 10,
    color: "#000",
  },
  witness: {
    width: "100%",
    float: "left",
    fontFamily: "Arial,Helvetica,sans-serif",
    fontSize: "14px !important",
  },
  name: {
    display: "block",
    textAlign: "left",
    fontWeight: 600,
    borderBottom: "1px solid",
  },
});
const Certificate = ({ open, handleClose }) => {
  const classes = useStyles();
  const ref = useRef(null);
  const onButtonClick = useCallback(() => {
    if (ref.current === null) {
      return;
    }
    toJpeg(ref.current, { cacheBust: true })
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = "my-image-name.jpg";
        link.href = dataUrl;
        link.click();
      })
      .catch((err) => {
        console.log("Error >> ", err);
      });
  }, [ref]);

  const printDocument = () => {
    const input = document.getElementById("certificate");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF();
      pdf.addImage(imgData, "JPEG", 0, 0);
      pdf.save("download.pdf");
    });
  };
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      onClose={handleClose}
      keepMounted
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle id="alert-dialog-slide-title" className={classes.title}>
        <h2 className={classes.newCer}>Certificate Preview</h2>
      </DialogTitle>
      <DialogContent className={classes.content}>
        <div className={classes.certificate} id="certificate" ref={ref}>
          <a style={{ color: "#0d4a2b" }}>
            <img
              src={headLogo}
              alt="nhio"
              style={{ maxWidth: 80, height: "auto" }}
            />
            <h1 className={classes.newHoleInOne}>Hole-in-One</h1>
            <div className={classes.nameCert}>tester tester</div>
            <div className={classes.nameCourse}>Tester </div>
            <div className={classes.nameCourse}>
              <div style={{ display: "inline-block" }}>New york,&nbsp;</div>
              <div style={{ display: "inline-block" }}> NY</div>
            </div>
            <div className={classes.newDate}>October 23, 2021 </div>
            <div className={classes.extraInfo}>
              <div style={{ display: "inline-block" }}>
                <span style={{ fontWeight: "600" }}>Hole</span> : 1
              </div>
              <div style={{ display: "inline-block", margin: "0 10px" }}>
                <span style={{ fontWeight: "600" }}>Yardage</span> : 2
              </div>
              <div style={{ display: "inline-block" }}>
                <span style={{ fontWeight: "600" }}>Club Used</span> : 1 Iron
              </div>
            </div>
            <div className={classes.witness}>
              <div style={{ display: "inline-block", margin: "0 5px" }}>
                <span className={classes.name}>tester</span>
                <span style={{ textAlign: "left", display: "block" }}>
                  Witness
                </span>
              </div>
              <div style={{ display: "inline-block", margin: "0 5px" }}>
                <span className={classes.name}>tester</span>
                <span style={{ textAlign: "left", display: "block" }}>
                  Witness
                </span>
              </div>
              <div style={{ display: "inline-block", margin: "0 5px" }}>
                <span className={classes.name}>tester</span>
                <span style={{ textAlign: "left", display: "block" }}>
                  Witness
                </span>
              </div>
            </div>
          </a>
        </div>
      </DialogContent>
      <DialogActions>
        <Button onClick={printDocument} color="primary" variant="contained">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Certificate;
