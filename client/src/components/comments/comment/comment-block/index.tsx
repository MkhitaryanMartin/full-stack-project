import React, {MouseEvent, useMemo} from 'react';
import { Avatar } from '@mui/material';
import formatDate from '../../../../utils/formatDate';
import { cn as bem } from '@bem-react/classname';
import { CommentBlockProps } from '../model';
import "./style.css";
import FlexContainer from '../../../flex-container';


const CommentBlock = ({
    onAnswer,
    onCancel,
    onSubmit,
    item,
    position,
    imgUrl,
    productId,
    userId,
    onReply,
    activeReply
}: CommentBlockProps) => {

    const callbacks = {
        onAnswer: (e: MouseEvent<HTMLDivElement>) => onAnswer(item._id),
        onCancel: () => onCancel(),
        onSubmit: (data: {comment:string}) => onSubmit(data, { _id: item._id, _type: 'comment', _article:productId}),
        onReply: (e:MouseEvent<HTMLAnchorElement>)=> {
            e.stopPropagation()
            onReply(item.parent._id)
            onAnswer (item.parent._id)
        }
      };
      const parentName = useMemo(() => userId === item.author._id ? "Your" : item.parent.name, [userId]);
      const active = activeReply ? `message-${position} activeComment` : `message-${position}`
    return (
        <div className={`message-${position}__block`} onClick={callbacks.onAnswer}>
            {position === "rigth" ? <Avatar alt="Remy Sharp" src={imgUrl}  sx={{ width: 50, height: 50 }}/>: null}
        <div className={active}>
       <FlexContainer jC='space-between'  aI='flex-start'>
       <h6>{item.author?.profile?.name}</h6>
       {
       item.parent._type === "comment" && <a
        href={"#" + item.parent._id} 
        onClick={callbacks.onReply} 
        id={item._id}
        className='reply-link'
        >
            reply to {parentName} comment : {item.parent.text}
        </a>
        }
       </FlexContainer>
             <p className="message-content">{item.text}</p>
             <div className="message-timestamp">{formatDate(item.dateCreate)}</div>
         </div>
         {position === "left" ? <Avatar alt="Remy Sharp" src={imgUrl}  sx={{ width: 50, height: 50 }}/>: null}
        </div>
    );
};

export default CommentBlock;