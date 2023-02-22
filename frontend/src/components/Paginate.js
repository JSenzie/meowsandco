import React from "react"
import { Pagination } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"

function Paginate({ pages, page, keyword = "" }) {
  let param = ""
  if (keyword) {
    if (keyword.includes("keyword")) {
      keyword = keyword.split("?keyword=")[1].split("&")[0]
      param = "keyword"
    } else if (keyword.includes("category")) {
      keyword = keyword.split("?category=")[1].split("&")[0]
      param = "category"
    }
  }

  return (
    pages > 1 && (
      <Pagination>
        {[...Array(pages).keys()].map((x) => (
          <LinkContainer
            key={x + 1}
            to={{
              pathname: "/",
              search: `?${param}=${keyword}&page=${x + 1}`,
            }}
            className={"mx-1"}
          >
            <Pagination.Item disabled={x + 1 === page} className={x + 1 === page ? "border border-success border-5" : ""}>
              {x + 1}
            </Pagination.Item>
          </LinkContainer>
        ))}
      </Pagination>
    )
  )
}

export default Paginate
