'use client';

/* eslint-disable react/require-default-props */
import React from 'react';
import { Col, Button } from 'react-bootstrap';
import Image from 'next/image';

type FollowerCardProps = {
  imageUrl: string;
  name: string;
  onProfileClick?: () => void;
  onFollowersClick?: () => void;
  onFriendsClick?: () => void;
};

const FollowerCard: React.FC<FollowerCardProps> = ({
  imageUrl,
  name,
  onProfileClick,
  onFollowersClick,
  onFriendsClick,
}) => (
  <Col className="d-flex flex-row align-items-center mt-3 ms-3">
    <Image
      src={imageUrl}
      alt="Profile Pic"
      width={50}
      height={50}
      style={{ border: '2px solid black' }}
    />
    <Button
      onClick={onProfileClick}
      className="ms-2"
      variant="link"
      style={{ textDecoration: 'none', color: 'black' }}
    >
      {name}
    </Button>
    <Button
      onClick={onFollowersClick}
      variant="link"
      style={{ fontSize: 15, textDecoration: 'none' }}
    >
      Followers
    </Button>
    <Button
      onClick={onFriendsClick}
      variant="link"
      style={{ fontSize: 15, textDecoration: 'none' }}
    >
      Friends
    </Button>
  </Col>
);

export default FollowerCard;
