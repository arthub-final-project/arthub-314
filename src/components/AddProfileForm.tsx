'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm, Resolver } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import swal from 'sweetalert';
import { addProfile } from '@/lib/dbActions';
import LoadingSpinner from '@/components/LoadingSpinner';
import { AddProfileSchema } from '@/lib/validationSchemas';
import { uploadImageAndGetURL } from '@/lib/supabase';

type FormInputs = {
  name: string;
  contact: string;
  image: FileList;
  socialMedia: string;
  artpiece: FileList;
  description: string;
  owner: string;
};

const AddProfileForm: React.FC = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const currentUser = session?.user?.email || '';

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>({
    resolver: yupResolver(AddProfileSchema) as Resolver<FormInputs>,
  });

  if (status === 'loading') return <LoadingSpinner />;
  if (status === 'unauthenticated') {
    router.push('/auth/signin');
    return null;
  }

  const onSubmit = async (data: FormInputs) => {
    const imageFile = data.image[0];
    const artpieceFile = data.artpiece[0];

    let imageUrl = '';
    let artpieceUrl = '';

    try {
      if (imageFile) imageUrl = await uploadImageAndGetURL(imageFile, 'profile-images');
      if (artpieceFile) artpieceUrl = await uploadImageAndGetURL(artpieceFile, 'gallery-images');
    } catch (err: any) {
      swal('Upload Failed', err.message, 'error');
      return;
    }

    const userId = Number(session?.user?.id);
    if (!userId) {
      swal('Error', 'User ID is missing', 'error');
      return;
    }

    try {
      await addProfile({ ...data, image: imageUrl, artpiece: artpieceUrl, userId });
      swal('Success', 'Your profile has been added', 'success', { timer: 2000 }).then(() => {
        router.push('/list');
      });
    } catch (err) {
      console.error('❌ Error adding profile:', err);
      swal('Error', 'Failed to add profile.', 'error');
    }
  };

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
