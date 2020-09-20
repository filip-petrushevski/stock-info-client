export default function ComponentsSwitch({ active, children }) {
  // Switch all children and return the "active" one
  return children.filter(child => child.props.name === active)
}