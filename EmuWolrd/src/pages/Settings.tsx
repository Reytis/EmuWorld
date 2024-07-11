import { Open, Warning } from "@/Icons"
import { CTA } from "@/components/CTA"
import { GameLibrary } from "@/components/GameLibrary"


export const SettingsPage = () => {

    return <div className="settings page">
      <h1>Settings</h1>
        <p className="error"><Warning /> Nothing Yet</p>
        <GameLibrary />
    </div> 
}

{/* <div className="ui_library">
    <h4>UI Library</h4>
    <div>
      <h1>Filter Bar</h1>
      <FilterBar />
    </div>
    <div>
      <h1>Grid Game Cell</h1>
      <div className="game_container">
        <button className='game_cell'><GameCell gameName={'Game Cell'} /></button>
        <button className='game_cell'><GameCell gameName={'Game Cell'} /></button>
        <button className='game_cell'><GameCell gameName={'Game Cell'} /></button>
        <button className='game_cell'><GameCell gameName={'Game Cell'} /></button>
      </div>
      <h1>List Game Cell</h1>
      <div className="game_container_list">
        <button className='game_cell_list'><GameCellList gameName={'Game Cell List'} /></button>
        <button className='game_cell_list'><GameCellList gameName={'Game Cell List'} /></button>
        <button className='game_cell_list'><GameCellList gameName={'Game Cell List'} /></button>
      </div>      
    </div>
    <div>
      <h1>Game Edition</h1>
      <GameEditor />
    </div>
    <div>
      <h1>Console Cell</h1>
      <div className="console_container">
        <Console name='Nintendo Switch' pictures='Switch' />
        <Console name='Nintendo DS' pictures='DS' />
        <Console name='Wii' pictures='Wii' />
      </div>
    </div>
    <div className="inputs_container">
      <h1>Inputs</h1>
      <FilterInput type='Options' options={["Option 1", "Option 2", "Option 3", "Option 4"]} />
      <Checkbox  label='Checkbox'/>
      <TextInput placeHolder={'Search'}><Search /></TextInput>
      <TextInput placeHolder={'Name'} label='Name'><CTA><Cross /></CTA></TextInput>
      <Switch options={[<Grid />, <List />]} current={0} />
      {<Opener />}
    </div>
    <div className="cta_container">
      <h1>CTA</h1>
      <CTA><Home />Full Icon<Home /></CTA>
      <CTA><Home />Left Icon</CTA>
      <CTA>Right Icon<ChevronRight /></CTA>
      <CTA>No Icon</CTA>
      <CTA selected noBorder>Selected & No Radius</CTA>
    </div>
    <div className='icons_container'>
      <h1>Icon Set</h1>
      <div className="icons_list">
        <Star />
        <BookShelf />
        <Burger />
        <ChevronDown />
        <ChevronLeft />
        <ChevronRight />
        <ChevronUp />
        <Cross />
        <Edit />
        <Grid />
        <Home />
        <List />
        <Manette />
        <Open />
        <Remove />
        <Search />
        <Settings />
        <Reset />
        <Img />
      </div>      
    </div>
  </div> */}