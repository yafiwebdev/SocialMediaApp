import * as React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { FaRegHeart, FaRegComment } from 'react-icons/fa';

interface IComments {
  commenter: string;
  comment: string;
}

interface IPost {
  username: string;
  url: string;
  caption: string;
  interactions: [
    {
      likes: Array<string>;
      comments: Array<IComments>;
    }
  ];
}

interface IChildrenComponentProps {
  user: IPost;
}

const Post: React.FC<IChildrenComponentProps> = ({ user }) => {
  if (!user) return <div>Error</div>;

  return (
    <Container>
      <Row className="justify-content-center">
        <Col sm={6}>
          <Card className="shadow mb-2">
            <Card.Body>
              <Card.Subtitle className="mb-2 font-weight-bold">
                {user.username}
              </Card.Subtitle>
              <Card.Img src={user.url} />
              <div className="intaractions-icons my-2">
                <span>
                  <FaRegHeart />
                </span>
                <span>
                  <FaRegComment />
                </span>
              </div>
              <div className="likes font-weight-bold">
                {user.interactions[0].likes.length} Me gusta
              </div>
              <Card.Text className="caption my-2">
                <strong>{user.username}</strong> {user.caption}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Post;
