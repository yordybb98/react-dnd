import { useDrag } from "react-dnd";

const DraggableImageInBox = ({ id, url }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        type: "imageBox",
        item: { id },
        collect: (monitor) => ({
            isDragging: !!monitor.isDragging(),
        }),
    }));

    return (
        <div ref={drag}>
            <img src={url} alt="Draggable element" style={{ opacity: isDragging ? 0.5 : 1 }} />
        </div>
    );
};

export default DraggableImageInBox;
