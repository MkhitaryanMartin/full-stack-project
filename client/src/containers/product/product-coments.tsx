import React, {useCallback, useState, MouseEvent} from 'react';
import { useAppDispatch, useAppSelector } from '../../Hooks/redux';
import CommentsLayout from '../../components/comments/coments-layout';
import { useLocation, useNavigate } from 'react-router-dom';
import { IUser } from '../../models/IUser';
import { fetchAddComment } from '../../store/reducers/cooment/action';


const ProductComents = ({user, isAuth, id}:{user: IUser | null, isAuth: boolean, id: string | undefined}) => {

const {data, count} = useAppSelector(state => state.comments)
const dispatch = useAppDispatch();
const navigate = useNavigate();
const location = useLocation();
const [commentId, setCommentId] = useState<string | undefined>()
const [parentId, setParentId] = useState<string | undefined>()
const callbacks = {
    onSubmit: useCallback((data: {comment:string} , parent: {_id:string, _type:"comment"| "article"}) => {
        if(parent._type === "comment") setCommentId(undefined)
        if(user)dispatch(fetchAddComment({_id: user.id, text: data.comment, parent:parent}))
       }, [user]),
    onAnswer: useCallback((id:string) => setCommentId(id), []),
    onCancel: useCallback(() => setCommentId(undefined),[]),
    onNavigate: useCallback(()=>  navigate("/login", {state: {from: location.pathname}}),[location.pathname]),
    onReply: useCallback((id:string)=> setParentId(id),[])
}

    return (
        <CommentsLayout 
         data={data}
          count={count}
          onAnswer={callbacks.onAnswer}
          onCancel={callbacks.onCancel} 
          onNavigate={callbacks.onNavigate} 
          onSubmit={callbacks.onSubmit} 
          isAuth={isAuth} 
          commentId={commentId}
          userId={user ? user.id:""}
          productId={id ? id : ""}
          userPhoto={user?.photo ? user.photo :""}
          onReply={callbacks.onReply}
          parentId={parentId}
          />
    );
};

export default ProductComents;