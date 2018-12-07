import React from "react";

const PostDetails = (props) => {
  //  console.log(props)
  const id = props.match.params.id
  return (
    <div className="container section post-details">
      <div className="card z-depth-0">
        <div className="card-content">
          <span className="card-title">Post Title - {id}</span>
          <p>
            As a Software Engineer Intern in The Garage, you’ll bring a product
            to life with a small team of other software engineering, design, and
            program manager interns, receiving guidance and insight from a team
            of experienced technical coaches and mentors. Your intern team has
            end-to-end ownership for development and quality of a product (and
            associated services) that will delight customers and add strategic
            value for Microsoft. You evaluate requirements, estimate costs, and
            create and implement features and services. You define and implement
            the quality criteria for your app, using measurements and insights
            to understand and validate the quality of experience for customers.
            You manage risks, leverage other products and technologies, and
            drive integration with the broader ecosystem. As a software engineer
            intern, you are dedicated to producing the world’s most advanced
            software.{" "}
          </p>
        </div>
        <div className="card-action grey-text">
        <div>Posted by Ramen mania</div>
        <div>7th December, 1am</div>
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
