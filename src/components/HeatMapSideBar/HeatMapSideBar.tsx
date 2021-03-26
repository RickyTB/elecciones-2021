import { Box, Heading } from "@chakra-ui/react";
import React from "react";
import { HeatMapControl } from "../HeatMapControl";
import { HeatMapInfo } from "../../models";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";

export interface HeatMapSideBarProps {
  heatMapList: HeatMapInfo[];
  onReorder: (index: number, newValue: number) => void;
  onActiveChange: (index: number, newValue: boolean) => void;
  onOpacityChange: (index: number, newValue: number) => void;
}

const HeatMapSideBar: React.FC<HeatMapSideBarProps> = ({
  heatMapList,
  onReorder,
  onActiveChange,
  onOpacityChange,
}) => {
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <Box bg="whiteAlpha.600" w="20vw" boxShadow="base" p={4} zIndex={2}>
      <Heading size="md" mb={4}>
        Mapas de calor
      </Heading>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided) => (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              {heatMapList.map((item, index) => (
                <Draggable
                  key={item.type}
                  draggableId={item.type}
                  index={index}
                >
                  {(provided) => (
                    <HeatMapControl
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      title={item.title}
                      active={item.active}
                      opacity={item.opacity}
                      onActiveChange={(value) => onActiveChange(index, value)}
                      onOpacityChange={(value) => onOpacityChange(index, value)}
                    />
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </Box>
  );
};

export default HeatMapSideBar;
