import { motion } from 'framer-motion';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Typography, Container } from '@mui/material';
// components
import { MotionContainer, varBounceIn } from '../components/animate';
import Page from '../components/Page';
import { PageNotFoundIllustration } from '../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
}));

// ----------------------------------------------------------------------

export default function Page404() {
  return (
    <RootStyle title="404 Page Not Found | Minimal-UI">
      <Container>
        <MotionContainer initial="initial" open>
          <Box sx={{ maxWidth: 480, margin: 'auto', textAlign: 'center' }}>
            <motion.div variants={varBounceIn}>
              <Typography variant="h3" paragraph>
                404
              </Typography>
              <Typography variant="h3" paragraph>
                Не найдено
              </Typography>
            </motion.div>
            <Typography sx={{ color: 'text.secondary' }} mb={5}>
              Страница не существует или у вас нет доступа.
            </Typography>

            <Button to="/" size="large" variant="contained" component={RouterLink}>
              На главную
            </Button>
          </Box>
        </MotionContainer>
      </Container>
    </RootStyle>
  );
}
