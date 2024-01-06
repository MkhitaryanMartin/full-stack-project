import { memo, MouseEvent } from 'react';
import { cn as bem } from '@bem-react/classname';
import { commentSchema } from '../../../constant/formValidate';
import Form from '../../form';
import { Box, Button} from '@mui/material';
import CommentBlock from './comment-block';
import { CommentProps } from './model';
import './style.css';
import CommentLink from '../../comments/comment-link';


function Comment(props: CommentProps) {
  const callbacks = {
    onAnswer: () => props.onAnswer(props.item._id),
    onCancel: () => props.onCancel(),
    onSubmit: (data: { comment: string }) => props.onSubmit(data, { _id: props.item._id, _type: 'comment', _article:props.productId}),
  };
  const commentClass = props.item.author._id === props.userId ? 'MyComment Comment-Container' : 'Comment Comment-Container';
  const position = props.item.author._id === props.userId ? "left" : "rigth";
  const imgUrl = (props.item.author._id === props.userId ? props.userPhoto : props.item.author.profile.photo) || ""
    return (
    <div className={commentClass} >
<CommentBlock
        onAnswer={props.onAnswer}
        onCancel={props.onCancel}
        onSubmit={props.onSubmit}
        item={props.item}
        position={position}
        imgUrl={imgUrl}
        productId={props.productId}
        userId={props.userId}
        onReply={props.onReply}
        activeReply={props.activeReply}
      />

      <Box sx={{mt:'10px', width:"50%"}}>
      {props.isOpen && (
        props.isAuth ? (
          <Form
            className='Comment'
            inputList={[{ name: "comment", type: "textarea", placeholder: `Мой ответ для ${props?.item.author?.profile?.name}` }]}
            onSubmit={callbacks.onSubmit}
            schema={commentSchema}
            submit='Answer'
            variant='text'
          >
            <Button onClick={callbacks.onCancel}>Cancel</Button>
          </Form>
        ) : <CommentLink onNavigate={props.onNavigate} onCancel={props.onCancel}/>
      )}
      </Box>
    </div>
  );
}

export default memo(Comment);
