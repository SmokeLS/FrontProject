import { useEffect, useRef } from 'react';
import { Box, TableCell, Typography, Divider } from '@mui/material';
import Scrollbar from '../../components/Scrollbar';

export default function ScrollableCell({ comments }) {
  const scrollRef = useRef([]);
  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, []);
  return (
    <TableCell ml={4} sx={{ width: '40%', minWidth: '240px' }}>
      <Scrollbar
        sx={{
          border: '1px solid #ccc',
          maxHeight: '200px',
          borderRadius: '10px',
          pl: 1,
          pr: 1,
          wordBreak: 'break-all'
        }}
        scrollableNodeProps={{ ref: scrollRef }}
      >
        <Box>
          {comments.map((comment, index) => (
            <div key={index}>
              <Typography mt={1} variant="caption" display="block" gutterBottom>
                {comment.date_created}
              </Typography>
              <Typography mb={1} sx={{ fontSize: '14px' }}>
                {comment.text}
              </Typography>
              <Divider />
            </div>
          ))}
          {!comments.length && (
            <Box sx={{ minHeight: 50 }} display="flex" justifyContent="center" alignItems="center">
              <Typography mb={1} sx={{ fontSize: '14px' }}>
                Пусто
              </Typography>
            </Box>
          )}
        </Box>
      </Scrollbar>
    </TableCell>
  );
}
