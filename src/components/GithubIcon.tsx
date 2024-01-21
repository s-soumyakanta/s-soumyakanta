import GitHubIcon from '@mui/icons-material/GitHub';
type GitHubIconType = {
    link?:string
}
const GithubIcon = ({link}:GitHubIconType) => {
  return (
    <a href={link}>
        <GitHubIcon />
    </a>
  )
}

export default GithubIcon