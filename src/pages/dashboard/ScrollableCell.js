import { useEffect, useRef } from 'react';
import { Box, TableCell, Typography, Divider } from '@mui/material';
import Scrollbar from '../../components/Scrollbar';

export default function ScrollableCell() {
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
          pr: 1
        }}
        scrollableNodeProps={{ ref: scrollRef }}
      >
        <Box>
          <Typography mt={1} variant="caption" display="block" gutterBottom>
            11.03.2021 15:30, Иванов И.И.
          </Typography>
          <Typography mb={1} sx={{ fontSize: '14px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit
          </Typography>
          <Divider />
          <Typography mt={1} variant="caption" display="block" gutterBottom>
            11.03.2021 16:30, Иванов И.И.
          </Typography>
          <Typography mb={1} sx={{ fontSize: '14px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua"
          </Typography>
          <Divider />
          <Typography mt={1} variant="caption" display="block" gutterBottom>
            11.03.2021 16:30, Иванов И.И.
          </Typography>
          <Typography mb={2} sx={{ fontSize: '14px' }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
            dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua"
          </Typography>
        </Box>
      </Scrollbar>
    </TableCell>
  );
}
