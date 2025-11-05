const Img = ({ url, caption }) => {
  return (
    <div>
      <img src={url} alt="" />

      {caption.length ? (
        <p className="w-full text-center my-3 md:mb-12 text-base text-dark-grey">
          {caption}
        </p>
      ) : (
        " "
      )}
    </div>
  );
};

const Quote = ({ quote, caption }) => {
  return (
    <div className="bg-purple/10 p-3 pl-5 border-l-4 border-purple">
      <p>{quote}</p>
      {caption.length ? (
        <p className="w-full text-purple text-base">{caption}</p>
      ) : (
        ""
      )}
    </div>
  );
};

const List = ({ style, items }) => {
  return (
    <ol
      className={`pl-5 ${style == "ordered" ? " list-decimal" : "list-disc"}`}
    >
      {items.map((listItem, i) => {
        return (
          <li
            key={i}
            className="my-4"
            dangerouslySetInnerHTML={{ __html: listItem }}
          ></li>
        );
      })}
    </ol>
  );
};

const BlogContent = ({ block }) => {
  let { type, data } = block;

  if (type == "paragraph") {
    return <p dangerouslySetInnerHTML={{ __html: data.text }}></p>;
  }

  //   if (type == "header") {
  //     if (data.level == 3) {
  //       return (
  //         <h3
  //           className="text-3xl font-bold"
  //           dangerouslySetInnerHTML={{ __html: data.text }}
  //         ></h3>
  //       );
  //     }
  //   }

  if (type === "header") {
    switch (data.level) {
      case 1:
        return (
          <h1
            className="text-5xl font-extrabold leading-tight"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></h1>
        );

      case 2:
        return (
          <h2
            className="text-4xl font-bold leading-snug"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></h2>
        );

      case 3:
        return (
          <h3
            className="text-3xl font-bold"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></h3>
        );

      case 4:
        return (
          <h4
            className="text-2xl font-semibold"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></h4>
        );

      case 5:
        return (
          <h5
            className="text-xl font-medium"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></h5>
        );

      case 6:
        return (
          <h6
            className="text-lg font-normal"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></h6>
        );

      default:
        return (
          <h3
            className="text-2xl font-bold"
            dangerouslySetInnerHTML={{ __html: data.text }}
          ></h3>
        );
    }
  }

  if (type == "image") {
    return <Img url={data.file.url} caption={data.caption} />;
  }

  if (type == "quote") {
    return <Quote quote={data.text} caption={data.caption} />;
  }

  if (type == "list") {
    return (
      <List style={data.style} items={data.items} caption={data.caption} />
    );
  }
};

export default BlogContent;
