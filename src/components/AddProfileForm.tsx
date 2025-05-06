'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddProfileSchema } from '@/lib/validationSchemas';

type FormInputs = {
  name: string;
  contact: string;
  image: FileList;
  socialMedia: string;
  artpiece: FileList;
  description: string;
  owner: string;
};

// Helper to convert File -> Base64 string
const fileToBase64 = (file: File): Promise<string> => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => resolve(reader.result as string);
  reader.onerror = (error) => reject(error);
});

const onSubmit = (session: any) => async (data: FormInputs) => {
  const imageFile = data.image[0];
  const artpieceFile = data.artpiece[0];

  const imageUrl = imageFile ? await fileToBase64(imageFile) : '';
  const artpieceUrl = artpieceFile ? await fileToBase64(artpieceFile) : '';

  const userId = session?.user?.id; // Assuming `id` is available in session.user
  if (!userId) {
    swal('Error', 'User ID is missing', 'error');
    return;
  }
  await addProfile({ ...data, image: imageUrl, artpiece: artpieceUrl, userId });

  swal('Success', 'Your profile has been added', 'success', {
    timer: 2000,
  });
};

const AddProfileForm: React.FC = () => {
  const { data: session, status } = useSession();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(AddProfileSchema) as Resolver<FormInputs>,
  });

  if (status === 'loading') {
    return <LoadingSpinner />;
  }

  if (status === 'unauthenticated') {
    redirect('/auth/signin');
  }

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={10}>
          <Col className="text-center">
            <h2>Add Profile</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit(session))}>
                <Row>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Name</Form.Label>
                      <input
                        type="text"
                        placeholder="Enter your name"
                        {...register('name')}
                        className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.name?.message}</div>
                    </Form.Group>
                  </Col>
                  <Col>
                    <Form.Group className="mb-2">
                      <Form.Label>Contact Information</Form.Label>
                      <input
                        type="text"
                        placeholder="Enter your preferred contact method"
                        {...register('contact')}
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
                        placeholder="Social media handle"
                        {...register('socialMedia')}
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
                    placeholder="Include a brief description of yourself"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>

                <input type="hidden" {...register('owner')} value={currentUser} />

                <Row className="pt-3">
                  <Col>
                    <Button type="submit" variant="primary" className="me-2">
                      Submit
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

export default AddProfileForm;
