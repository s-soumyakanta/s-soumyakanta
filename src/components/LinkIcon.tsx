import OpenInNewOutlinedIcon from '@mui/icons-material/OpenInNewOutlined';
const LinkIcon = ({link}:{link:string}) => {
  return (
    <a href={link} target="_blank">
      <OpenInNewOutlinedIcon />
    </a>
  )
}

export default LinkIcon
