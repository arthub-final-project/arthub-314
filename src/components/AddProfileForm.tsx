'use client';

import { useSession } from 'next-auth/react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { redirect } from 'next/navigation';
import { addProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddProfileSchema } from '@/lib/validationSchemas';

const onSubmit = async (data: {
  name: string;
  contact: string;
  image: string;
  socialMedia: string;
  artpiece: string;
  description: string;
  owner: string;
}) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await addProfile(data);
  swal('Success', 'Your profile has been added', 'success', {
    timer: 2000,
  });
};

const AddProfileForm: React.FC = () => {
  const { data: session, status } = useSession();
  // console.log('AddStuffForm', status, session);
  const currentUser = session?.user?.email || '';
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
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
                        placeholder="Enter your first and last name"
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
                      <Form.Label>Image</Form.Label>
                      <input
                        type="text"
                        placeholder="Enter a link or upload your profile picture"
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
                        placeholder="Enter a social media handle(username) here"
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
                        type="text"
                        {...register('artpiece')}
                        placeholder="Enter a link to your artpiece or upload it"
                        className={`form-control ${errors.artpiece ? 'is-invalid' : ''}`}
                      />
                      <div className="invalid-feedback">{errors.artpiece?.message}</div>
                    </Form.Group>
                  </Col>
                </Row>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <textarea
                    {...register('description')}
                    placeholder="Enter a description of yourself"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.description?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={currentUser} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary" className="me-1">
                        Submit
                      </Button>
                      <Button type="button" onClick={() => reset()} variant="warning">
                        Reset
                      </Button>
                    </Col>
                  </Row>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AddProfileForm;
