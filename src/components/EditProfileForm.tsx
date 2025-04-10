'use client';

import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import swal from 'sweetalert';
import { yupResolver } from '@hookform/resolvers/yup';
import { Profile } from '@prisma/client';
import { EditProfileSchema } from '@/lib/validationSchemas';
import { editProfile } from '@/lib/dbActions';

const onSubmit = async (data: Profile) => {
  // console.log(`onSubmit data: ${JSON.stringify(data, null, 2)}`);
  await editProfile(data);
  swal('Success', 'Your item has been updated', 'success', {
    timer: 2000,
  });
};

const EditProfileForm = ({ profile }: { profile: Profile }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Profile>({
    resolver: yupResolver(EditProfileSchema),
  });
  // console.log(profile);

  return (
    <Container className="py-3">
      <Row className="justify-content-center">
        <Col xs={5}>
          <Col className="text-center">
            <h2>Edit Profile</h2>
          </Col>
          <Card>
            <Card.Body>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <input type="hidden" {...register('id')} value={profile.id} />
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('firstName')}
                    defaultValue={profile.firstName}
                    required
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Name</Form.Label>
                  <input
                    type="text"
                    {...register('firstName')}
                    defaultValue={profile.firstName}
                    required
                    className={`form-control ${errors.firstName ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.firstName?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Quantity</Form.Label>
                  <input
                    type="number"
                    {...register('quantity')}
                    defaultValue={profile.quantity}
                    className={`form-control ${errors.quantity ? 'is-invalid' : ''}`}
                  />
                  <div className="invalid-feedback">{errors.quantity?.message}</div>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Condition</Form.Label>
                  <select
                    {...register('condition')}
                    className={`form-control ${errors.condition ? 'is-invalid' : ''}`}
                    defaultValue={profile.condition}
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor</option>
                  </select>
                  <div className="invalid-feedback">{errors.condition?.message}</div>
                </Form.Group>
                <input type="hidden" {...register('owner')} value={profile.owner} />
                <Form.Group className="form-group">
                  <Row className="pt-3">
                    <Col>
                      <Button type="submit" variant="primary">
                        Submit
                      </Button>
                    </Col>
                    <Col>
                      <Button type="button" onClick={() => reset()} variant="warning" className="float-right">
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

export default EditProfileForm;
