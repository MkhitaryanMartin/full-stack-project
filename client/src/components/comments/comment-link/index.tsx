import { Button, Typography, Box } from '@mui/material';

type Props = {
    onCancel: () => void;
    onNavigate: () => void;
    text?: "Answer" | "Comment"
}

const CommentLink = ({
    onCancel,
    onNavigate,
    text = "Answer"
}: Props) => {
    return (
        <Box sx={{width:"290px"}}>
            <Button onClick={onNavigate}>Login,</Button>
            <Typography component="span">to be able to {text}.</Typography>
            {text === 'Answer' && <Button onClick={onCancel}>Cancel</Button>}
        </Box>

    );
};

export default CommentLink;