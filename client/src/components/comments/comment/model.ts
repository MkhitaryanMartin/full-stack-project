import React, { MouseEvent } from "react";
import { IComment, ISubmitComment } from "../../../models/IComment";

export interface IProps{
    item: IComment;
    onAnswer: (id: string) => void;
    onCancel: () => void;
    onSubmit: ISubmitComment;
    productId: string;
    userId: string;
    onReply: (id: string)=>void;
    activeReply: boolean
}

export interface CommentProps extends IProps{
    profileName?: string;
    isOpen: boolean;
    isAuth: boolean;
    onNavigate: () => void;
    userPhoto: string;
  }

  export interface CommentBlockProps extends IProps {
    position: "rigth" | "left";
    imgUrl: string;
  }