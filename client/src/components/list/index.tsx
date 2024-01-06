import React, { memo, ReactNode } from 'react';

interface ListItem {
  _id: string | number;
  // Другие свойства элемента списка
}

interface ListProps {
  list: ListItem[];
  renderItem?: (item: ListItem) => ReactNode;
}

const List: React.FC<ListProps> = ({ list, renderItem = () => null }) => {
  return (
    <div className='List'>
      {list.map(item => (
        <div key={item._id} className='List-item'>
          {renderItem(item )}
        </div>
      ))}
    </div>
  );
};

export default memo(List);
