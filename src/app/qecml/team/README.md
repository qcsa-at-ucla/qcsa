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
  hyperlink: "https://example.com/jane-doe",
  headshotPositionY: 15,
}
```

`hyperlink` is optional. When set, clicking the headshot opens that profile in a
new tab.

`headshotPositionY` is optional and ranges from `0` (top of the photo) to `100`
(bottom). It defaults to `0` when omitted.
