'use client';

import { Button, Card, Col, Container, Form, Row, Image } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Profile } from '@prisma/client';
import { EditProfileSchema } from '@/lib/validationSchemas';
import { editProfile } from '@/lib/dbActions';
import { useEffect, useState } from 'react';
import { InferType } from 'yup';

type FormInputs = InferType<typeof EditProfileSchema>;

const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});

const EditProfileForm = ({ profile }: { profile: Profile }) => {
  const [previewImage, setPreviewImage] = useState<string>(profile.image);
  const [previewArtpiece, setPreviewArtpiece] = useState<string>(profile.artpiece);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(EditProfileSchema),
    defaultValues: {
      name: profile.name,
      contact: profile.contact,
      image: undefined as unknown as FileList,
      socialMedia: profile.socialMedia,
      artpiece: undefined as unknown as FileList,
      description: profile.description,
    },
  });

  const imageWatch = watch('image');
  const artpieceWatch = watch('artpiece');

  useEffect(() => {
    if (imageWatch instanceof FileList && imageWatch.length > 0) {
      setPreviewImage(URL.createObjectURL(imageWatch[0]));
    }
  }, [imageWatch]);

  useEffect(() => {
    if (artpieceWatch instanceof FileList && artpieceWatch.length > 0) {
      setPreviewArtpiece(URL.createObjectURL(artpieceWatch[0]));
    }
  }, [artpieceWatch]);

  const onSubmit = async (data: FormInputs) => {
    // Dynamically pass the updated context
    const context = {
      image: data.image instanceof FileList && data.image.length > 0 ? data.image[0] : profile.image,
      artpiece: data.artpiece instanceof FileList && data.artpiece.length > 0 ? data.artpiece[0] : profile.artpiece,
    };

    // Validate the form with the updated context
    const isValid = await EditProfileSchema.isValid(data, { context });

    if (isValid) {
      let imageUrl = profile.image;
      if (data.image instanceof FileList && data.image.length > 0) {
        imageUrl = await fileToBase64(data.image[0]);
      }

      let artpieceUrl = profile.artpiece;
      if (data.artpiece instanceof FileList && data.artpiece.length > 0) {
        artpieceUrl = await fileToBase64(data.artpiece[0]);
      }

      await editProfile({
        ...data,
        image: imageUrl,
        artpiece: artpieceUrl,
        id: 0,
        owner: '', // Assuming owner is not editable here
      });

      swal('Success', 'Your profile has been updated', 'success', {
        timer: 2000,
      });
    } else {
      swal('Error', 'There are errors in your form', 'error');
    }
  };

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Edit Profile</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id' as any)} value={profile.id} />
                <input type="hidden" {...register('owner' as any)} value={profile.owner} />
                <Row>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Name</Form.Label>
                      <input
                        type="text"
                        {...register('name')}
                        defaultValue={profile.name}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.name?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Contact</Form.Label>
                      <input
                        type="text"
                        {...register('contact')}
                        defaultValue={profile.contact}
                        className={`form-control ${errors.contact ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.contact?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Profile Image</Form.Label>
                      {previewImage && (
                        <div className="mb-2">
                          <Image src={previewImage} rounded height={100} />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        {...register('image')}
                        className={`form-control ${errors.image ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.image?.message}</div>
                    </Form.Group>
                  </Col>

                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Social Media</Form.Label>
                      <input
                        type="text"
                        {...register('socialMedia')}
                        defaultValue={profile.socialMedia}
                        className={`form-control ${errors.socialMedia ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.socialMedia?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Artpiece</Form.Label>
                      {previewArtpiece && (
                        <div className="mb-2">
                          <Image src={previewArtpiece} thumbnail height={150} />
                        </div>
                      )}
                      <input
                        type="file"
                        accept="image/*"
                        {...register('artpiece')}
                        className={`form-control ${errors.artpiece ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.artpiece?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>

                <Form.Group className="mb-2">
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    defaultValue={profile.description}
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner' as any)} value={profile.owner} />

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary" className="me-2">
                      Save Changes
                    </Button>
                    <Button type="button" onClick={() => reset()} variant="warning">
                      Reset
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default EditProfileForm;
