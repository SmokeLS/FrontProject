import PropTypes from 'prop-types';
import { findIndex } from 'lodash';
import { useEffect, useState, useRef } from 'react';
//
import Scrollbar from '../../Scrollbar';
import LightboxModal from '../../LightboxModal';
import ChatMessageItem from './ChatMessageItem';

// ----------------------------------------------------------------------

ChatMessageList.propTypes = {
  conversation: PropTypes.object.isRequired
};

export default function ChatMessageList({ profile, conversation }) {
  const scrollRef = useRef();
  const [openLightbox, setOpenLightbox] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    const scrollMessagesToBottom = () => {
      if (scrollRef.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };
    scrollMessagesToBottom();
  }, [conversation.messages]);

  const images = conversation.messages
    .filter((messages) => messages.contentType === 'image')
    .map((messages) => messages.body);

  const handleOpenLightbox = (url) => {
    const selectedImage = findIndex(images, (index) => index === url);
    setOpenLightbox(true);
    setSelectedImage(selectedImage);
  };

  return (
    <>
      <Scrollbar scrollableNodeProps={{ ref: scrollRef }} sx={{ p: 3 }}>
        {profile.comments.map((comment) => (
          <ChatMessageItem
            comment={comment}
            key={comment.id}
            message={comment.text}
            conversation={conversation}
            onOpenLightbox={handleOpenLightbox}
          />
        ))}
      </Scrollbar>

      <LightboxModal
        images={images}
        photoIndex={selectedImage}
        setPhotoIndex={setSelectedImage}
        isOpen={openLightbox}
        onClose={() => setOpenLightbox(false)}
      />
    </>
  );
}
