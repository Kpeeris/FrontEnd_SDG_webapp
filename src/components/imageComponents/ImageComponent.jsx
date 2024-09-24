import { useState, useEffect } from "react";
import { images, imagesLocked } from "./buildingImages";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function ImageComponent({ imageName, top, left, width, height, target }) {
  const sourceLocked = imagesLocked[imageName];
  const sourceUnlocked = images[imageName];

  const [source, setSource] = useState(sourceLocked);

  const navigate = useNavigate();

  const [show, setShow] = useState(false);
  //outsource this logic to a different component and delete this line;
  //module done should decided on the actual quiz page not this one boys
  let moduleDone = false;

  const [status, setStatus] = useState("Start");

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
  };

  //toggles between the locked and unloked version of image when clicked?
  const decideSource = (source, moduleDone, sourceLocked, sourceUnlocked) => {
    //moduleDone flag will be set when the module has been finished
    if (source === sourceLocked) {
      if (show === true) {
        return sourceUnlocked;
      } else {
        if (moduleDone) {
          setStatus("Redo");
          return sourceUnlocked;
        }
        return sourceLocked;
      }
    }
    return sourceUnlocked;
  };

  const handleClick = () => {
    setSource(decideSource(source, moduleDone, sourceLocked, sourceUnlocked));
    handleShow();
  };

  //
  useEffect(() => {
    //we're gonna do an API call to the database here boys
    //and define taskNum and the task description. For now,
    //shall add it to the component params though\
  }, [show]);

  return (
    <div>
      <div
        className="container"
        style={{
          position: "absolute",
          top: top,
          left: left,
          width: width,
          height: height,
          padding: "0px",
        }}
      >
        <img
          src={source}
          alt={imageName}
          style={{ position: "relative", width: "100%", height: "100%" }}
        />
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="success"
              className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/"
              onClick={handleClick}
            >
              Starts
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Target 11.{target}</DialogTitle>
              <DialogDescription>
                description of target goes here
              </DialogDescription>
            </DialogHeader>

            <div>
              <img src="" alt="" />
              <Button onClick={() => navigate(`/module/${target}/content`)}>
                {status}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default ImageComponent;
