import { useDrop } from "react-dnd";

const DroppableBox = ({ onDrop, children }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: "image",
        drop: (item, monitor) => onDrop(item.id),
        collect: (monitor) => ({
            isOver: !!monitor.isOver(),
        }),
    }));

    return (
        <div ref={drop} style={{ position: "relative", backgroundColor: isOver ? "lightgreen" : "#d9d9d9", maxWidth: "1920px", height: "200px", display: "flex", columnGap: "20px", overflow: "auto" }}>
            {children}
        </div>
    );
};

export default DroppableBox;
