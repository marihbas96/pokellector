export const headerLinks = [
  {
    label: 'Home',
    route: '/',
  },
  {
    label: 'Start a collection',
    route: '/collections/create',
  },
  {
    label: 'My Profile',
    route: '/profile',
  },
]


export const collectionDefaultValues = {
  isGraded: "",
  isGem: "",
  isRaw: "",
  isSet: "",
  isLang: "",
}

// standard boolean dropdown
export const binaryDropdown = [
    { label: "Yes", value: "yes"},
    { label: "No", value: "no"},
]

export const languageDropdown = [
  { label: "English", value: "ENG" },
  { label: "Japanese", value: "JAP" },
  { label: "Chinese", value: "CHI" },
  { label: "Korean", value: "KOR" },
  { label: "German", value: "GER" },
  { label: "Universal", value: "UNI" },
]

// export const eventDefaultValues = {
//   title: '',
//   description: '',
//   location: '',
//   imageUrl: '',
//   startDateTime: new Date(),
//   endDateTime: new Date(),
//   categoryId: '',
//   price: '',
//   isFree: false,
//   url: '',
// }