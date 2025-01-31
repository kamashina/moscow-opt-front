import React, { FC } from "react";
import Skeleton, { SkeletonProps } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Props = { wrapperClassName?: string } & SkeletonProps;

const CustomSkeleton: FC<Props> = ({ wrapperClassName, ...rest }) => {
  return (
    <div className="relative w-full mt-2">
      <Skeleton
        width="100%"
        count={1}
        baseColor="#EBEBEB"
        highlightColor="#FFF"
        borderRadius={30}
        height={400}
        duration={2}
        {...rest}
      />
    </div>
  );
};

export default CustomSkeleton;
