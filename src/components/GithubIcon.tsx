import GitHubIcon from '@mui/icons-material/GitHub';
type GitHubIconType = {
    link?:string
}
const GithubIcon = ({link}:GitHubIconType) => {
  return (
    <a href={link} target="_blank">
        <GitHubIcon />
    </a>
  )
}

export default GithubIcon
