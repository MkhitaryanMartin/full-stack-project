import React, { memo, MouseEvent } from 'react';
import { IComment, ISubmitComment } from '../../../models/IComment';
import { Box, Typography} from '@mui/material';
import Comment from '../../comments/comment';
import FlexContainer from "../../flex-container"
import { cn as bem } from '@bem-react/classname';
import Form from '../../form';
import { commentSchema } from '../../../constant/formValidate';
import "./style.scss"
import CommentLink from '../comment-link';

type Props ={
    data: IComment[];
    count: number;
    onCancel: ()=>void;
    onSubmit: ISubmitComment
    onAnswer: (id: string)=>void;
    commentId: string | undefined;
    isAuth: boolean;
    onNavigate:()=> void,
    userId: string,
    productId: string,
    userPhoto: string,
    onReply: (id: string)=>void,
    parentId: string | undefined
}

const CommentsLayout = ({
    data,
    count, 
    onCancel,
    onSubmit,
    onAnswer,
    isAuth,
    commentId,
    onNavigate,
    userId,
    productId,
    userPhoto,
    onReply,
    parentId
}: Props) => {
    const cn = bem("CommentLayout")
    const callbacks = {
        onSubmit: (data: {comment:string}) => onSubmit(data, { _id: productId, _type: 'article'}),
    }
    return (
        <div className={cn()}>
            <Typography variant='h4' sx={{m:"10px 5px"}}>Comments ({count})</Typography>
            {data  &&  data.map((item)=>{
                return <Comment 
                onAnswer={onAnswer} 
                onSubmit={onSubmit} 
                onCancel={onCancel} 
                isAuth={isAuth} 
                isOpen={!!(commentId === item._id)} 
                onNavigate={onNavigate} 
                item={item}
                key={item._id}
                userId={userId}
                userPhoto={userPhoto}
                productId={productId}
                onReply={onReply}
                activeReply={parentId === item._id}
                />
            })}
              {
                !commentId && isAuth ? (
                    <Form 
                    className='Comments'
                    inputList={[{name:"comment", type:"textarea", placeholder:"Text"}]} 
                    onSubmit={callbacks.onSubmit} 
                    schema={commentSchema}  
                    submit='Comment' 
                    variant='text'
                />
                  ) : !isAuth && !commentId ? (
                    <CommentLink onNavigate={onNavigate} onCancel={onCancel} text='Comment'/>
                  ) : null
            }
        </div>
    );
};

export default CommentsLayout;