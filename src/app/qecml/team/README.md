# QECML committee profiles

Add each person's name, role, affiliation, short bio, and headshot path to
`committee-members.ts`, in either `organizingCommittee` or `scientificCommittee`.

Put headshots in the matching folder under `public/images/qecml/` and use a path
like `/images/qecml/organizing-committee/jane-doe.jpg` for `headshot`. Keep image
filenames lowercase and use hyphens between words.

Example:

```ts
{
  id: "jane-doe",
  name: "Jane Doe",
  role: "Co-chair",
  affiliation: "University of Southern California",
  bio: "Jane works on quantum error correction and machine learning.",
  headshot: "/images/qecml/organizing-committee/jane-doe.jpg",
}
```
