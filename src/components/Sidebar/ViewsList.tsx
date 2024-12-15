import React from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { SidebarViewItem } from './SidebarViewItem';
import { View } from './types';
import { clsx } from 'clsx';

interface ViewsListProps {
  views: View[];
  onViewsReorder: (views: View[]) => void;
  onFavorite: (id: string) => void;
}

export const ViewsList: React.FC<ViewsListProps> = ({
  views,
  onViewsReorder,
  onFavorite,
}) => {
  // Separate favorites and regular views
  const favorites = views.filter(view => view.isFavorite);
  const regularViews = views.filter(view => !view.isFavorite);

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const sourceList = result.source.droppableId === 'favorites' ? favorites : regularViews;
    const destList = result.destination.droppableId === 'favorites' ? favorites : regularViews;
    
    const allViews = [...views];
    const [movedItem] = sourceList.splice(result.source.index, 1);
    destList.splice(result.destination.index, 0, movedItem);

    // Reconstruct the full list maintaining favorites at the top
    const newViews = [...favorites, ...regularViews];
    onViewsReorder(newViews);
  };

  const DroppableSection = ({ id, items }: { id: string; items: View[] }) => (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.droppableProps}
          className={clsx(
            "space-y-0.5 transition-colors duration-200",
            snapshot.isDraggingOver && "bg-gray-50 rounded-lg"
          )}
        >
          {items.map((view, index) => (
            <Draggable key={view.id} draggableId={view.id} index={index}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  className={clsx(
                    "transition-all duration-200",
                    snapshot.isDragging && "scale-105 rotate-1"
                  )}
                >
                  <div className={clsx(
                    "transition-all duration-200",
                    snapshot.isDragging && "bg-white border rounded-lg shadow-lg"
                  )}>
                    <SidebarViewItem
                      icon={<span className="text-base">{view.emoji}</span>}
                      label={view.name}
                      count={view.count}
                      to={`/tickets/${view.id}`}
                      isFavorite={view.isFavorite}
                      onFavorite={() => onFavorite(view.id)}
                      dragHandleProps={provided.dragHandleProps}
                      isDragging={snapshot.isDragging}
                    />
                  </div>
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      {favorites.length > 0 && (
        <div className="mb-2">
          <h3 className="text-[10px] font-semibold text-gray-500 px-2 mb-1">FAVORITES</h3>
          <DroppableSection id="favorites" items={favorites} />
        </div>
      )}

      <div>
        <h3 className="text-[10px] font-semibold text-gray-500 px-2 mb-1">VIEWS</h3>
        <DroppableSection id="views" items={regularViews} />
      </div>
    </DragDropContext>
  );
};