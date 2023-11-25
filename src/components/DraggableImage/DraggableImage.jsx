import { useDrag } from "react-dnd";

const DraggableImage = ({ id, url }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "image",
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return <img ref={drag} src={url} alt="Draggable element" style={{ opacity: isDragging ? 0.5 : 1 }} />;
};

export default DraggableImage;
