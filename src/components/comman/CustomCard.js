"use client";
import { Avatar, Card, Skeleton } from "antd";
import { GrView } from "react-icons/gr";
import { AiOutlineHeart } from "react-icons/ai";
import Link from "next/link";
const { Meta } = Card;

export default function CustomCard(props) {
  const { title, name, courseId } = props;
  return (
    <Card
      style={{
        width: 300,
        marginTop: 16,
      }}
      actions={[
        <AiOutlineHeart className="fs-4" key="wishlist" />,
        <Link href={`/courses/lessons/${courseId}`} key={"view"}>
          <GrView key="view" />,
        </Link>,
      ]}
    >
      <Skeleton loading={false} avatar active>
        <Meta
          avatar={
            <Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />
          }
          name={name}
          title={title}
        />
      </Skeleton>
    </Card>
  );
}
