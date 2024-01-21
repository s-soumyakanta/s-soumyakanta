import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
const LinkIcon = ({link}:{link:string}) => {
  return (
    <a href={link}>
      <OpenInNewOutlinedIcon />
    </a>
  )
}

export default LinkIcon