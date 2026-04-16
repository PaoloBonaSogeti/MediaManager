using MediaManager.Api.Data;
using MediaManager.Api.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace MediaManager.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class MediaTypeController(AppDbContext db) : ControllerBase
{
    // GET api/mediatype
    [HttpGet]
    public async Task<ActionResult<IEnumerable<MediaType>>> GetAll()
    {
        return await db.MediaTypes.ToListAsync();
    }

    // GET api/mediatype/1
    [HttpGet("{id:int}")]
    public async Task<ActionResult<MediaType>> GetById(int id)
    {
        var mediaType = await db.MediaTypes.FindAsync(id);
        return mediaType is null ? NotFound() : Ok(mediaType);
    }

    // POST api/mediatype
    [HttpPost]
    public async Task<ActionResult<MediaType>> Create(MediaType mediaType)
    {
        db.MediaTypes.Add(mediaType);
        await db.SaveChangesAsync();
        return CreatedAtAction(nameof(GetById), new { id = mediaType.Id }, mediaType);
    }

    // PUT api/mediatype/1
    [HttpPut("{id:int}")]
    public async Task<IActionResult> Update(int id, MediaType mediaType)
    {
        if (id != mediaType.Id)
            return BadRequest();

        db.Entry(mediaType).State = EntityState.Modified;

        try
        {
            await db.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await db.MediaTypes.AnyAsync(t => t.Id == id))
                return NotFound();
            throw;
        }

        return NoContent();
    }

    // DELETE api/mediatype/1
    [HttpDelete("{id:int}")]
    public async Task<IActionResult> Delete(int id)
    {
        var mediaType = await db.MediaTypes.FindAsync(id);
        if (mediaType is null)
            return NotFound();

        db.MediaTypes.Remove(mediaType);
        await db.SaveChangesAsync();
        return NoContent();
    }
}
