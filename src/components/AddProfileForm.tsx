const AddProfileForm: React.FC = () => {
  return <div>Form temporarily deactivated</div>;
};

export default AddProfileForm;

/* 'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddProfileFormSchema, AddProfileSchema } from '@/lib/validationSchemas';

type FormInputs = {
  name: string;
  contact: string;
  image: FileList | null;
  socialMedia: string;
  artpiece: FileList | null;
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

const onSubmit = async (data: FormInputs) => {
  const imageFile = data.image instanceof FileList && data.image.length > 0 ? data.image[0] : null;
  const artpieceFile = data.artpiece instanceof FileList && data.artpiece.length > 0 ? data.artpiece[0] : null;
  
  const formData = new FormData();
  formData.append('name', data.name);
  formData.append('contact', data.contact);
  formData.append('socialMedia', data.socialMedia);
  formData.append('description', data.description);
  formData.append('owner', data.owner);
  if (imageFile) formData.append('image', imageFile);
  if (artpieceFile) formData.append('artpiece', artpieceFile);

  await addProfile({ ...data, image: imageFile, artpiece: artpieceFile });

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
  } = useForm<AddProfileFormSchema>({
    resolver: yupResolver(AddProfileSchema),
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
              <Form onSubmit={handleSubmit(onSubmit)}>
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

                <input type="hidden" {...register('owner')} value={currentUser || ''} />
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
*/
