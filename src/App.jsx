import { useState } from "react";
import DraggableImage from "./components/DraggableImage/DraggableImage";
import DroppableBox from "./components/DroppableBox/DroppableBox";
import DraggableImageInBox from "./components/DraggableImageInBox/DraggableImageInBox";
import { useDrop } from "react-dnd";
import DeleteIcon from "@mui/icons-material/Delete";
import RestartAltIcon from "@mui/icons-material/RestartAlt";
import { Grid, IconButton, TextField, Typography } from "@mui/material";

const defaultImages = [
    { id: 1, url: "https://picsum.photos/id/237/200" },
    { id: 2, url: "https://picsum.photos/id/238/200" },
    { id: 3, url: "https://picsum.photos/id/239/200" },
];

const App = () => {
    const [images, setImages] = useState(defaultImages);
    const [currentImage, setCurrentImage] = useState([]);

    const restartImages = () => {
        setImages(defaultImages);
        setCurrentImage([]);
    };

    const onDrop = (id) => {
        const droppedImage = images.find((image) => image.id === id);
        setImages((prevImages) => prevImages.filter((image) => image.id !== id));
        setCurrentImage((prevImages) => [...prevImages, droppedImage]);
    };

    const onRemove = (id) => {
        setCurrentImage((prevImages) => prevImages.filter((image) => image.id !== id));
    };

    const [{ isOver }, drop] = useDrop(() => ({
        accept: "imageBox",
        drop: (item, monitor) => onRemove(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <div className="sidebar">
                {images.map((image) => (
                    <DraggableImage key={image.id} id={image.id} url={image.url} />
                ))}
            </div>

            {currentImage.length > 0 && (
                <Grid
                    container
                    ref={drop}
                    style={{ backgroundColor: isOver ? "red" : "white", height: "50px", width: "fit-content", border: "2px dashed black", justifyContent: "center", alignItems: "center", padding: 2 }}>
                    <Typography variant="h6" component="div" textAlign={"center"}>
                        Drag an image here, to delete it from the Gray Box
                    </Typography>
                    <DeleteIcon sx={{ fontSize: "25px" }} />
                </Grid>
            )}
            <DroppableBox onDrop={onDrop}>
                {currentImage.map((image) => (
                    <DraggableImageInBox key={image.id} id={image.id} url={image.url} onRemove={onRemove} />
                ))}
                {currentImage.length > 0 && (
                    <IconButton sx={{ position: "absolute", top: 0, right: 0 }} onClick={restartImages}>
                        <RestartAltIcon />
                    </IconButton>
                )}

                {currentImage.length === 0 && images.length === 0 && (
                    <Grid container direction={"column"} justifyContent={"center"} alignItems={"center"}>
                        <IconButton onClick={restartImages}>
                            <Grid container item xs={6} justifyContent={"center"} alignItems={"center"} direction={"column"}>
                                <RestartAltIcon fontSize="100px" />
                                <Typography>Restart the app to add images to the box</Typography>
                            </Grid>
                        </IconButton>
                    </Grid>
                )}
            </DroppableBox>
        </div>
    );
};

export default App;
