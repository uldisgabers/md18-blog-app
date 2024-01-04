import { Post, Tag } from "@/app/types";
import { formatDistance, parseISO } from "date-fns";
import Link from "next/link";
import style from "./page.module.css";

async function getTagPosts(id: string) {
  const res = await fetch("http://localhost:3000/api/tags/" + id, {
    next: {
      revalidate: 0,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

async function getTags() {
  const res = await fetch("http://localhost:3000/api/tags", {
    next: {
      revalidate: 0, // Janoskatas NetNinja Next.JS #8 tutorial un javeic izmainas beigas
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

export default async function TagPage({
  params,
}: {
  params: { slug: string };
}) {
  const posts = await getTagPosts(params.slug);

  const tags = await getTags();

  return (
    <main className={style.main}>
      <div className={style.sectionWrapper}>
        {posts.map((post: Post) => (
          <div key={post.post_id} className={style.blogSection}>
            <div className={style.pictureWrapper}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img className={style.image} src={post.img} alt="blog-post-pic" />
            </div>
            <Link className={style.title} href={`/${post.post_id}`}>
              {post.title}
            </Link>
            <div
              className={style.paragraph}
              dangerouslySetInnerHTML={{ __html: post.content }}
            ></div>
            <div className={style.postInfoDetails}>
              <div>
                {tags.map((tag: Tag) => {
                  if (tag.tag_id === post.tag_id) {
                    return (
                      <Link
                        key={tag.tag_id}
                        href={`/tag/${tag.tag_id}`}
                        className={style.tag}
                      >
                        {tag.tag_name}
                      </Link>
                    );
                  }
                })}
              </div>
              <div className="card__timestamp">
                created{" "}
                {formatDistance(parseISO(post.createdAt), new Date(), {
                  addSuffix: true,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
